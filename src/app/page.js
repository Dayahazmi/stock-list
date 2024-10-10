import Navbar from './component/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full m4 h-screen  ">
        <h1 className="text-3xl font-bold text-center mb-1 text-black dark:text-white">
          SpreadSheet? Stock Inventory will help you.
        </h1>


      </div>
    </>
  );
}
