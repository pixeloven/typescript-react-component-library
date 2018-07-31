import * as React from "react";
import "./Ring.css"

// TODO should make this an enum
// TODO should redo classes and make more configurable
// TODO Need to write tests
// TODO clean up css
export interface RingProps extends React.HTMLProps<HTMLDivElement> {
    status?: string
}

export default class Ring extends React.PureComponent<RingProps> {
    render() {
        const { status } = this.props;
        return (
            <div className="f-modal-alert">
                {status === 'success' &&
                <div className="f-modal-icon f-modal-success animate">
                    <span className="f-modal-line f-modal-tip animateSuccessTip" />
                    <span className="f-modal-line f-modal-long animateSuccessLong" />
                    <div className="f-modal-placeholder" />
                    <div className="f-modal-fix" />
                </div>}
                {status === 'warning' &&
                <div className="f-modal-icon f-modal-warning scaleWarning">
                    <span className="f-modal-body pulseWarningIns" />
                    <span className="f-modal-dot pulseWarningIns" />
                </div>}
                {status === 'error' &&
                <div className="f-modal-icon f-modal-error animate">
                    <span className="f-modal-x-mark">
                        <span className="f-modal-line f-modal-left animateXLeft" />
                        <span className="f-modal-line f-modal-right animateXRight" />
                    </span>
                    <div className="f-modal-placeholder" />
                    <div className="f-modal-fix" />
                </div>}
            </div>
        );
    }
}
