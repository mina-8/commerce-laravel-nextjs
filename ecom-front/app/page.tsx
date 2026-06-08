
import Home from "@/components/home-page/home";

export default function  Index() {
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">      
      <main className="flex flex-1 w-full max-w-3xl lg:max-w-7xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <Home />
      </main>
    </div>
  );
}
