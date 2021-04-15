import Head from 'next/head';
import Header from '../components/Header';
import { API_KEY, CONTEXT_KEY } from '../keys'
import Response from '../response'
import { useRouter } from 'next/router'
import SearchResults from '../components/SearchResults';

function Search({results}) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{router.query.term} - Google Search</title>
                <link rel="icon" href="/Google-Chrome-Google-Chrome.ico" />
            </Head>

            {/* Header */}
            <Header />

            {/* Search results */}
            <SearchResults results={results}/>
        </div>
    )
}

export default Search

export async function getServerSideProps(context) {
    const useMockData = false;

    const startIndex = context.query.start || "0";

    const data = useMockData == true ? Response : await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`)
                        .then((response) => response.json());

    return {
        props:{
            results: data
        }
    }
}