import * as React from "react";

import "./icon.scss";

interface Props {
  iconName: string;
  iconType: string;
  className?: string;
}

class Icon extends React.Component<Props> {
  public render() {
    const {iconName, iconType, className} = this.props;

    return(
      <svg
        height="1.1875em"
        width="1.1875em"
        viewBox="0 0 19 19"
        className={`a-icon ${ className }`}
      >
        <use href={`/static/media/${ iconType }-icons.svg#ui-${ iconName }`}/>
      </svg>
    );
  }
}

export default Icon;
