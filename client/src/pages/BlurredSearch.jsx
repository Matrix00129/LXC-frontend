import NavBar from "src/components/navbar/NavBar";
import BlurredSearchLayout from "src/components/search-page/BlurredSearchLayout";

const BlurredSearch = () => {
  return (
    <div className="h-screen">
      <div className="max-w-[1100px] bg-red-80 mx-auto h-full flex flex-col">
        {/* ======Navbar component========= */}
        <section>
          <NavBar />
        </section>

        {/* ====== MainContent goes here ..... =========== */}
        <section className="bg-[#ebeef5] pt-20 md:pt-[104px] flex flex-col items-center mx-[10px] md:mx-[20px] font-Avenir">
          <BlurredSearchLayout />
        </section>
      </div>
    </div>
  );
};

export default BlurredSearch;
