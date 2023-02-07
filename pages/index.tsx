import type {NextPage} from 'next'
import React, {useState} from "react";
import Navbar from '../app/component/Navbar/Navbar';
import WordContent from "../app/component/Word-Content/WordContent";
import callApi from "../app/helper/callApi";
import {useQuery} from "@tanstack/react-query";
import SearchKeyWord from "../app/component/Search";

const Home: NextPage = () => {
    const [darkToggle, setDarkToggle] = useState(false)
    const [fontFamily, setFontFamily] = useState('serif')
    const [term, setTerm] = useState('dictionary')
    const { isLoading, data,status,} = useQuery({
        queryKey: ['SearchKey',term],
        queryFn: async () =>
           await callApi().get(`/v2/entries/en/${term}`).then(
                (res) => res.data,
            ),

    })


    const handleChangeFont = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFontFamily(e.target.value)
    }

    const onSearchedWord = (text: React.SetStateAction<string>) => {
        setTerm(text)
    }
    return (
        <div className={`${darkToggle && 'dark'}`}>
            <main className={"dark:bg-black min-h-screen"} style={{fontFamily}}>
                <Navbar darkToggle={darkToggle}
                        fontFamily={fontFamily}
                        handleChange={handleChangeFont}
                        setDarkToggle={() => setDarkToggle(!darkToggle)}/>
                <section className={"container-app w-"} id="search">
                    <SearchKeyWord onChangeHandler={onSearchedWord}/>
                </section>
                <WordContent loading={isLoading}  wordDetails={data} />
            </main>
        </div>
    )
}

export default Home
