import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";


function ImageGallery(data,
    setData,
    imagecount,
    setImagecount,
    hasMore,
    setHasMore,
    getNext) {
    return (
      <div className="pt-8 pr-16 pl-16 pb-8">
        <InfiniteScroll
          className="grid grid-cols-3 gap-8 justify-items-center mx-64 "
          dataLength={data.length}
          next={() => {
            getNext(data[data.length - 1].id).then((datay) => {
              setData([...data, ...datay]);

              console.log(data);
              if (data.length === imagecount) {
                setHasMore(false);
              }
            });
          }}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {/* find something else other than margin for this problem*/}

          {data.map((item) => (
            <div
              key={item.id}
              className={
                "shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center rounded-lg relative" +
                (item.createdAt.seconds % 2 === 1
                  ? " w-[385px] h-[600px] row-span-2"
                  : " w-[385px] h-[300px]")
              }
            >
              <div className="absolute inset-0 z-10 opacity-0  0 hover:opacity-100 duration-300 ">
                <div className="bg-black bg-opacity-0 p-4 w-full h-full hover:bg-opacity-50 transition-all duration-500">
                  <button
                    type="button"
                    className="absolute top-4 right-4 px-4 py-1 text-[#EB5757] hover:text-white border border-[#EB5757] hover:bg-[#EB5757] font-medium rounded-3xl text-sm text-center "
                  >
                    Delete
                  </button>

                  <h2 className="text-white absolute inset-x-0 bottom-0 p-6 text-3xl font-bold">
                    {item.label}
                  </h2>
                </div>
              </div>

              <Image
                loading="lazy"
                src={item.url}
                layout="fill"
                className="rounded-xl object-cover text-white absolute inset-0 z-0"
                title={item.label}
              />
            </div>
          ))}
        </InfiniteScroll>
        {hasMore ? null : (
          <div className="flex justify-center text-3xl font-extrabold m-16">
            <h1>Sadly, No More Pictures :(</h1>
          </div>
        )}
      </div>
    );
  }

  export default ImageGallery;