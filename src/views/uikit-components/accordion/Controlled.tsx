import { Icon } from '@iconify/react';
import { useState } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';

// ----------------------------------------------------------------------

type ControlledProps = {
  accordions: {
    value: string;
    heading: string;
    subHeading: string;
    detail: string;
  }[];
};

export default function Controlled({ accordions }: ControlledProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {accordions.map((item, index) => (
        <Accordion
          key={item.value}
          disabled={index === 3}
          expanded={expanded === item.value}
          onChange={handleChange(item.value)}
        >
          <AccordionSummary
            expandIcon={
              <Icon icon={arrowIosDownwardFill} width={20} height={20} />
            }
          >
            <Typography
              variant="subtitle1"
              sx={{ width: '33%', flexShrink: 0 }}
            >
              {item.heading}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.subHeading}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
