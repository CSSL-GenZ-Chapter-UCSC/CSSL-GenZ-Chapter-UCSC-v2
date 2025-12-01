import { BlogListing } from "../components/sections/BlogListing";
import {DynamicButtons} from "../components/sections/DynamicButtons";


export const metadata = {
  title: "Blogs",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function ContactUsPage() {
  return (
    <main className="flex flex-col">
      
      <BlogListing />
             
    </main>
  );
}
