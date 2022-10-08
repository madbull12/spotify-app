import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { ICategory } from '../interface';
import spotifyApi from '../lib/spotifyApi';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState<any>(null);
    const { data: session } = useSession();
    const accessToken: any = session?.accessToken;

    useEffect(() => {
        if (!accessToken) return;
    
        const fetchCategories = async () => {
          try {
            const res = await spotifyApi.getCategories({ limit: 40 });
            setCategories(res.body);
          } catch (error) {
            console.log(error);
          }
        };
        fetchCategories();
      }, []);
  return (
    <div className="grid grid-cols-5 gap-4 mt-8">
      {categories?.categories.items.map((category: ICategory) => (
        <CategoryCard category={category} />
      ))}
    </div>
  )
}

export default Categories