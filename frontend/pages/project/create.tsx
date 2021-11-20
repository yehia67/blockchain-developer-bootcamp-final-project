import { Box, ButtonGroup } from "@chakra-ui/react";
import { uploadIPFS } from "@frameworks/ipfs/ipfs";
import { Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  PercentComplete,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";
import * as React from "react";
import * as Yup from "yup";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initialValues = {
  projectName: "",
  description: "",
  ethAmount: 0,
  projectImage: "",
  duration: "",
};
const validationSchema = Yup.object({
  projectName: Yup.string().required(),
  description: Yup.string().required(),
  ethAmount: Yup.number().required().min(0).max(120),
  duration: Yup.string().required(),
  projectImage: Yup.object().nullable(),
});

const Create = () => {
  const [ipfsHash, setIpfsHash] = React.useState("");
  const onSubmit = (values: React.FormEvent) => {
    sleep(300).then(() => {
      window.alert(JSON.stringify({ ipfsHash, ...values }, null, 2));
    });
  };
  return (
    <Formik
      // @ts-ignore
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <InputControl name="projectName" label="Your Project Name" />
          <>
            <InputControl
              name="projectImage"
              label="Your project image will be uploaded to ipfs"
              inputProps={{
                type: "file",
                accept: "image/*",
                onChangeCapture: (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  if (event && event.target && event.target.files) {
                    uploadIPFS({
                      content: event.target.files[0],
                    }).then((hash) => {
                      console.log("hash", hash);
                      setIpfsHash(hash as string);
                    });
                  }
                },
              }}
            />
          </>
          <TextareaControl
            name="description"
            label="Your project description"
          />

          <NumberInputControl
            name="ethAmount"
            label="Amount of ETH that you need (max 120)"
          />

          <SelectControl
            label="Project Duration"
            name="duration"
            selectProps={{ placeholder: "Select option" }}
          >
            <option value="1">One Month</option>
            <option value="3">Three Month</option>
            <option value="6">Six Month</option>
            <option value="12">Years</option>
          </SelectControl>

          <PercentComplete />
          <ButtonGroup>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>

          <Box as="pre" marginY={10}>
            {JSON.stringify(values, null, 2)}
            <br />
            {JSON.stringify(errors, null, 2)}
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Create;
