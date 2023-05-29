import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";

const steps = [
  { title: "Pendiente", description: "Pedido recibido" },
  { title: "En preparación", description: "Preparando" },
  { title: "Enviado", description: "En camino" },
  { title: "Finalizado", description: "Envio recibido" },
];

function Example() {
  const { activeStep } = useSteps({
    index: 3,
    count: steps.length,
  });

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription color="grey">{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
export default Example;
