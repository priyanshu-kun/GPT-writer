import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image'
import placeholder from "../assets/file-text.svg"
import arrowRight from "../assets/arrow-right.svg"
import loader from "../assets/loader.gif"
import axios from 'axios';

const Home = () => {


  const [Content, setContent] = useState("")
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleContent = (e) => {
    setContent(prev => e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const { data } = await axios('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: Content
    });
    const { output } = data;
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
    setContent("")
  }


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | Priyanshu Sharma</title>
      </Head>
      <div className='titleTextContainer'>
        <h2 className='titleText'>
          Sup, magic blog post generator
        </h2>
      </div>
      {
        apiOutput.length === 0 && (
      <div className='formCover'>
        <h2>Input the title of your blog post below, we'll generate the rest.</h2>
        <textarea placeholder='eg. Bitcoin and the Future of Money.,Mastering Assembly Programming: Tips and Tricks for Efficient Code. etc' value={Content} onChange={handleContent}></textarea>
        <button className='generate-output' onClick={handleSubmit}>Generate <Image src={arrowRight} alt="arrow right" /></button>
      </div>
        )
      }
      {
        isGenerating ? (
          <Image src={loader} className="preloader" alt="preloader image" />
        ) : (
          apiOutput.length > 0 ? (
            <div className='output'>
              <h1>Output</h1>
              <div>
                {
                  apiOutput
                }
              </div>
              <button className='generate-output' onClick={() => setApiOutput("")}>Create a new blog <Image src={arrowRight} alt="arrow right" /></button>
            </div>
          ) : (
            <Image src={placeholder} className="output-placeholder" alt="placeholder image" />
          )
        )
      }
    </div>
  );
};

export default Home;
