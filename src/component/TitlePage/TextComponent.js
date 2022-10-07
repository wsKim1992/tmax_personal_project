import React, { forwardRef, memo, useEffect } from 'react';
import { TitleComponent } from './utilComponent';
import styled from 'styled-components';

const ThisTitleComponent = styled(TitleComponent)`
`;

const TextComponent = memo(forwardRef((props, ref) => {

    const { text, classname } = props;
    return (
        <ThisTitleComponent>
            <div ref={ref} className={classname}>
                {
                    text.map((tempText, i) => (
                        <div key={`${i}_top_text_component`}>
                            {
                                Array.prototype.map.call(tempText, (v, i) => (
                                    <span key={i}>{v}</span>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </ThisTitleComponent>
    )
}))

export default TextComponent;