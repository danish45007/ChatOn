import React from 'react';
import { Popup } from 'semantic-ui-react';

function PopupToolTip({ content, trigger }) {
	return <Popup inverted content={content} trigger={trigger} />;
}

export default PopupToolTip;
