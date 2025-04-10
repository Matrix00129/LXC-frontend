const Map = () => {
  return (
    <div className="mx-2 sm:w-full md:mx-0 lg:w-full rounded-md border-[1.3px] border-blue-300">
      <iframe
        style={{ width: "100%", height: "609px" }}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?hl=en&amp;q=Alausa,%20Ikeja,%20Lagos%20state.+(Lispendens)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
};

export default Map;
