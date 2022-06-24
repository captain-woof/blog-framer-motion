import posts from "./data.json";

type Post = {
    id: number,
    author: {
        id: number
        name: string,
        profilePic: string
    },
    date: number,
    content: {
        title: string,
        body: string,
        heroImage: string
    }
}

export const getPosts = async (): Promise<Array<Post>> => {    
    return posts;
}