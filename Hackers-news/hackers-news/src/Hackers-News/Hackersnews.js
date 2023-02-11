import { useEffect, useState } from 'react'
import Stories from './Stories';

const Hackersnews = () => {
  const [news, setNews] = useState([]);
  const [ids,setIds] = useState([]);
  const [page, setPage] = useState({start:0,end:0});
  const[loading, setLoading] = useState(true);
  const[selcted, setSelected] = useState(null);

  const toggle=(i)=>{
  
    if(selcted === i){
      setSelected(null)
    }
    setSelected(i);
  }

  useEffect(()=>{
    fetchIds()
  })

  const fetchIds= async ()=>{
    const data= await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const json= await data.json();
    //console.log("json", json);
    setIds(json);
    setPage(({...page, start:0, end:10}))
  }

  const handInfiniteScroll= async ()=>{
    try{
if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
  setLoading(true);
  setPage(pre=>({start:pre.end, end:pre.end+10}))
}
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    window.addEventListener('scroll', handInfiniteScroll);
    return window.removeEventListener('scroll', handInfiniteScroll);
  },[]);

  useEffect(()=>{
    fetchNews();
  }, [page])

  const fetchNews= async ()=>{
    const res=[];
    for(var i=page.start; i<page.end; i++){
      res.push(await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json?print=pretty`).then(res=>res.json()));
    }
    Promise.all(res).then(result=>{
      //console.log(result);
      //console.log(res);
      setNews(prev=>([...prev, ...result]))
    })
  }



return(<>
<div className='wrapper'>
<div className='accordian'>
  {
    news.map((item, i)=>{
      return(<Stories {...item} key={item.id} toggle={toggle} selcted={selcted} i={i}/>)
    })
  }
  {loading && "Loading...."}
</div>
 
  </div>
  </>)
  
}




export default Hackersnews