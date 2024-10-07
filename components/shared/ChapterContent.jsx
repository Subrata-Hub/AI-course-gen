import React from "react";
import ReactPlayer from "react-player/youtube";
import ReactMarkdown from "react-markdown";
const ChapterContent = ({ chapter, content }) => {
  return (
    <div className="p-8">
      <h2 className=" h2-semibold text-dark200_light900">
        {chapter?.chapter_name}
      </h2>
      <p className="text-dark500_light500 text-[15px]">{chapter?.about}</p>
      {content?.videoId && (
        <div className="my-6 flex justify-center">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${content?.videoId}`}
            width={640}
            height={360}
            controls={true}
          />
        </div>
      )}
      <div>
        {content?.content.map((item, index) => (
          <div
            className="mb-3 rounded-lg bg-sky-50 p-5 dark:bg-slate-950"
            key={index}
          >
            <h2 className="text-dark200_light900 text-lg font-semibold">
              {item.title}
            </h2>
            {/* <p className="whitespace-pre-wrap">{item.explanation}</p> */}
            <ReactMarkdown className="text-dark400_light700 mt-1 font-medium">
              {item.explanation}
            </ReactMarkdown>
            {item.codeExample && (
              <div className="mt-3 rounded-md border bg-slate-950 p-4 text-white dark:border-slate-700">
                <pre>
                  <code>{item.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
