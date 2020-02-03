import React, { useEffect } from "react";
import './TimelineStyles.css'

const TimelineContainer = (props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer timelineContent">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-tweet-limit="5"
          data-chrome="noheader nofooter noborders"
          href={`https://twitter.com/${props.screenName}`}
        >
        </a>
      </div>
    </section>
  );
};

export default TimelineContainer;