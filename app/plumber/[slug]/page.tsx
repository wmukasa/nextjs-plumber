import { fullPlumberInfo } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity"
import Image from "next/image";

export const revalidate = 30 // revalidate at most 30minutes

async function getData(slug:string){
    const query = `
    *[_type =='plumber' && slug.current =='${slug}']{
        "currentSlug": slug.current,
          name,
          smalldescription,
          plumberImage
          
      }[0]` //[0] it convert it to an object not an array
    // lets fetch our query
    const data = await client.fetch(query)
    //returning our data
    return data;
}
export default async function plumberDesc({params}:{params:{slug:string}}){
    //the method expects one parament
    const data:fullPlumberInfo = await getData(params.slug);
    // console.log(data);
    return(
        <div className="mt-8">
            <h1>
                {/* we make the span element block, our text to be centered, let the text be blue color
                and font to be semibold, it should be wide and then text should be in capital letters */}
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                    {data.name} Information
                </span>
                {/* margin on top of 2, margin should be in block text should be 3xl leading should be 8 
                font should be bold  tracking should be tight*/}
                <span className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
                    {data.name}
                </span>
            </h1>
            {/* we have to add property to the urlfor for width, height */}
            <Image src={urlFor(data.plumberImage).url()} 
            width={800} 
            height={800}
            alt="image"
            priority
            className="rounded-lg mt-8 border"    
             />
            <div className="mt-16 prose prose-blue prose-xl">
                <h3>{data.smalldescription}</h3>
            </div>
        </div>
    );
}