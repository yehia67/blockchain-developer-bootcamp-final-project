// Sample card from Airbnb
import { Image, Box, Badge } from "@chakra-ui/react";
import ProgressBar from "@components/ProgressBar";
export default function AirbnbExample() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    title: "Modern home in city center",
    formattedPrice: "7.3",
  };

  return (
    <Box maxW="sm" borderWidth="1px" m={2} borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box display="flex" alignItems="baseline">
          Goal: {property.formattedPrice}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            width="1em"
            height="1em"
            viewBox="0 0 784.37 1277.39"
          >
            <g>
              <polygon
                fill="#343434"
                fillRule="nonzero"
                points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
              />
              <polygon
                fill="#8C8C8C"
                fillRule="nonzero"
                points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
              />
              <polygon
                fill="#3C3C3B"
                fillRule="nonzero"
                points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
              />
              <polygon
                fill="#8C8C8C"
                fillRule="nonzero"
                points="392.07,1277.38 392.07,956.52 -0,724.89 "
              />
              <polygon
                fill="#141414"
                fillRule="nonzero"
                points="392.07,882.29 784.13,650.54 392.07,472.33 "
              />
              <polygon
                fill="#393939"
                fillRule="nonzero"
                points="0,650.54 392.07,882.29 392.07,472.33 "
              />
            </g>
          </svg>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <ProgressBar collected={2} goal={20} max={100} />
        </Box>
      </Box>
    </Box>
  );
}