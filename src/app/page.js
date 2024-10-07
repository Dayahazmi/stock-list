import Navbar from './component/Navbar'; // Import the Navbar component

export default function Page() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline text-center mb-1 text-black">
        Welcome to the Stock List
      </h1>
    </>
  );
}
