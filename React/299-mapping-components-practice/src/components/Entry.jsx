import React from "react";

function Entry(props){
    return (
        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              {props.emoji}
            </span>
            <span>{props.emojiName}</span>
          </dt>
          <dd>
            {props.emojiDetail}
          </dd>
        </div>
    );
}

export default Entry; 