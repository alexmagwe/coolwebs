import type { NextApiRequest, NextApiResponse, NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Main, { UserQuery } from "../components/Home"
import { request, gql } from "graphql-request"
import { getSession } from "@auth0/nextjs-auth0"
type Props = {
    user?: UserQuery
}
const Home: NextPage = (props: Props) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>CoolWebs</title>
                <meta
                    name="description"
                    content="find and bookmark cool websites"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <Main user={props.user} />
            </main>

            <footer className="absolute text-center w-full bottom-0">
                <span className="text-gray-400">@keplalabs</span>
            </footer>
        </div>
    )
}

export default Home
export const getServerSidePropsWrapper = async ({
    req,
    res,
}: {
    req: NextApiRequest
    res: NextApiResponse
}) => {
    const session = getSession(req, res)
    if (session) {
        const { user } = session
        if (user.email) {
            const query = gql`
                query User {
                    user {
                        email
                        id
                        bookmarks {
                            id
                        }
                    }
                }
            `
            try {
                const data = await request("/api/graphql", query)
                if (data && data.user) {
                    return {
                        props: {
                            user: data.user,
                        },
                    }
                }
            } catch (err) {
                console.error(err)
            }
        }
        return {
            props: {},
        }
    }
    return { props: {} }
}
