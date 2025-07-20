import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../services/postService";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setCreatePost] = useState<number>(1);

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["posts", debounceSearchQuery, currentPage],
    queryFn: () => fetchPosts(debounceSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const toggleModal = () => {
  setIsModalOpen(!isModalOpen)
}
const
  
  const posts = data?.posts ?? [];
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick=({}=></header>)</button>
      </header >
      {isModalOpen && <Modal onClose={}=>}
      {/* <Modal></Modal> */}
      {posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}
