import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://accounts.spotify.com/api/token?" +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        `https://accounts.spotify.com/authorize?scope=user-read-email,user-follow-modify,user-follow-read,playlist-read-private,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,playlist-modify-public,playlist-modify-private,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read&redirect_uri=${process.env.NEXTAUTH_URL}/api/auth/callback/spotify`,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});

// import NextAuth from 'next-auth';
// import SpotifyProvider from 'next-auth/providers/spotify';
// import spotifyApi from '../../../lib/spotifyApi';

// async function refreshAccessToken(token) {
//   try {
//     spotifyApi.setAccessToken(token.accessToken);
//     spotifyApi.setAccessToken(token.refreshToken);

//     const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

//     console.log('Refreshed token is', refreshedToken);

//     return {
//       ...token,
//       accessToken: refreshedToken.access_token,
//       accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
//       refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     };
//   }
// }

// export default NextAuth({
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.SPOTIFY_CLIENT_ID,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//       authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-follow-modify,user-follow-read,playlist-read-private,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,playlist-modify-public,playlist-modify-private,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read',
//     }),
//   ],
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signIn: '/auth/signin',
//   },
//   callbacks: {
//     async jwt({ token, account, user }) {
//       // Initil Sign In
//       if (account && user) {
//         return {
//           ...token,
//           accessToken: account.access_token,
//           refreshToken: account.refresh_token,
//           username: account.providerAccountId,
//           accessTokenExpires: account.expires_at * 1000,
//         };
//       }

//       // Return previous token if the access token hasn't expired yet
//       if (Date.now() < token.accessTokenExpires) {
//         console.log('Token is valid ...');
//         return token;
//       }

//       // Access Token expired, so refresh it...token
//       console.log('Token expired, refreshing...');
//       return await refreshAccessToken(token);
//     },

//     async session({ session, token }) {
//       session.user.accessToken = token.accessToken;
//       session.user.refreshToken = token.refreshToken;
//       session.user.username = token.username;

//       return session;
//     },
//   },
// });