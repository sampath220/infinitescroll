import React, { useCallback, useRef, useState } from 'react'
import useBookSearch from './useBookSearch';

export default function InfiniteScroll() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const { books, loading, hasMore, error } = useBookSearch(query, pageNumber);

    const observer = useRef();

    const lastMessageRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(pageNumber => pageNumber + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore])


    const handleSearch = (e) => {
        setQuery(e.target.value);
        setPageNumber(1);
    }

    return (
        <div>
            <input type="text" value={query} onChange={handleSearch}></input>
            {books.map((b, index) => {
                if (books.length === index + 1)
                    return <div ref={lastMessageRef}>{b}</div>
                else
                    return <div>{b}</div>
            })}
            {loading && <div>loading....</div>}
        </div>
    )
}
