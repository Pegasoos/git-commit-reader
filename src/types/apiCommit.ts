export default interface apiCommit {
    author: {
        login: string,
        id: number,
        node_id: string,
        avatar_url: string,
    },
    comments_url: string,
    commit: {
        author:{
            name: string,
            email: string,
            date: string
        },
        comment_count: number,
        committer: {
            name: string,
            email: string,
            date: string
        },
        message: string,
        tree: {
            sha: string,
            url: string
        },
        url: string,
        verification: {
            payload: null,
            reason: string,
            signature: null,
            verified: boolean
        }
    },
    committer: {
        avatar_url: string,
        events_url: string,
        followers_url: string,
        following_url: string,
        gists_url: string,
        gravatar_id:string,
        html_url:string,
        id: number,
        login: string,
        node_id: string,
        organizations_url: string,
        received_events_url: string,
        repos_url: string,
        site_admin: boolean,
        starred_url: string,
        subscriptions_url: string,
        type: string,
        url: string
    },
    html_url: string,
    node_id: string,
    parents:[{
        html_url: string, sha: string, url: string
        }
    ],
    sha: string,
    url: string,
    latest: boolean
};