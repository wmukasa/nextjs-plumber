import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "@/node_modules/next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { simplegetPro } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
async function getData(){
  const query = `
  *[_type == 'plumber'] | order(_createdAt asc){
    name,
    smalldescription,
      "currentSlug":slug.current,
    plumberImage
  }`;
 const data = await client.fetch(query)
 return data;
}

export default async function Home() {
  const data:simplegetPro[] = await getData()
  // console.log(data);
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        {data.map((post,idx) => (
          <Card key={idx}>
            <Image src={urlFor(post.plumberImage).url()} 
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.name}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smalldescription}</p>
              <Button asChild className="w-full mt-7">
                <Link href={`/plumber/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
          
        ))}
      </div>
  );
}

