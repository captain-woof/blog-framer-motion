import { useQuery } from "react-query";
import { getPosts } from "../utils/posts/index";

export const usePosts = () => {
    const { data, isError, isLoading, isFetched, isSuccess } = useQuery('posts', getPosts);
    return {
        data, isError, isLoading, isFetched, isSuccess
    }
}