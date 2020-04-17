import React from 'react'
import {
  OverlayTrigger,
  Popover
} from 'react-bootstrap'


const InfoPopover = ({key, placement, title, content, children}) => (
  <OverlayTrigger
    trigger="click"
    key={key}
    placement={placement}
    overlay={
      <Popover id={`popover-positioned-${placement}`}>
        <Popover.Title as="h5">{title}</Popover.Title>
        <Popover.Content>
          {content}
        </Popover.Content>
      </Popover>
    }
  >
    {children}
  </OverlayTrigger>
)

export default InfoPopover;