'use client'

import React, { useEffect, useState } from 'react';
import PostPreview from './PostPreview';
import SearchBar from './SearchBar'



interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
  }

  interface PostListProps {
    showSearchBar: boolean;
  }


  const PostList: React.FC<PostListProps> = ({ showSearchBar }) => {
    //console.log("showSearchBar--",showSearchBar);
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/blogs/latest', {
            next: { revalidate: 0 },
          });
          const data = await response.json();
          setPosts(data.posts);
          setFilteredPosts(data.posts); // Initialize filteredPosts with all posts
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchPosts();
    }, []);
  
    useEffect(() => {
      filterPosts();
    }, [selectedCategories, searchValue]); // Re-filter posts when selectedCategories or searchValue changes
  
    const filterPosts = () => {
      //console.log("filterposts");
      let filtered = posts;
  
      //console.log("selected categories--",selectedCategories);
  
      //console.log("searched text--",searchValue);
      // Filter by selected categories
      if (selectedCategories.length != 0 ) {
        filtered = filtered.filter(post => selectedCategories.includes(post.category));
      }
  
      // Filter by search text (title or content contains searchValue)
      if (searchValue.trim() !== '') {
        const lowerSearchValue = searchValue.trim().toLowerCase();
        filtered = filtered.filter(post =>
          post.title.toLowerCase().includes(lowerSearchValue) ||
          post.content.toLowerCase().includes(lowerSearchValue)
        );
      }
  
      setFilteredPosts(filtered);
    };
  
    const handleCategoryChange = (category: string) => {
      //console.log('handle category change--',category);
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    };
  
    const handleSearch = (searchText: string) => {
      console.log('update search value--',searchValue);
      setSearchValue(searchText);
    };
  
    //console.log("filteredPosts--",filteredPosts);
    
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <main className="flex-grow container mx-auto p-4">
        {showSearchBar && (
          <SearchBar
            selectedCategories={selectedCategories}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            searchValue={searchValue}
          />
        )}
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostPreview key={post.id} post={post} />
              ))}
            </div>
          </section>
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
              Load More
            </button>
          </div>
        </main>
      </div>
    );
  };
  
  export default PostList;
  