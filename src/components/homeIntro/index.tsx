import brand from "../../assets/ss-image.png";

const HomeIntro = ({
  title = "Explore the Timeless Legacy of William Shakespeare",
  hasSubTitle = true,
}: {
  title: string;
  hasSubTitle?: boolean;
}) => {
  return (
    <div className="flex justify-center items-center mt-14 mb-5 flex-col">
      <div className="flex justify-center items-center h-[240px] w-[240px] rounded-full border border-gray-300 mb-5">
        <img className="rounded-full" src={brand} alt="William Shakespeare" />
      </div>
      <h1
        className="text-4xl leading-[64px] font-bold"
        style={{ fontFamily: "'Kalam', cursive" }}
      >
        {title}
      </h1>
      {hasSubTitle ? (
        <h4 className="text-[#636366] font-normal text-xl">
          Read and search through the books written by Shakespeare with no
          hassle
        </h4>
      ) : null}
    </div>
  );
};

export default HomeIntro;
