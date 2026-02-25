/** 
HOW TO USE:
* Import `typography` and apply the style directly to a <Text /> component.
*
* Example:
*   import { typography } from "@/theme";
*
*   <Text style={typography.h1}>Page title</Text>
*   <Text style={typography.h2}>Section title</Text>
*   <Text style={typography.h3}>Subheading</Text>
*   <Text style={typography.p}>Body text</Text>
*   <Text style={typography.pBold}>Emphasized body text</Text>  
*/

import { colors } from "./colors";

export const typography = {
  h1: {
    fontSize: 36,
    lineHeight: 50, // 140%
    fontFamily: "Inter-Black",
    color: colors.text,
  },

  h2: {
    fontSize: 24,
    lineHeight: 29,
    fontFamily: "Inter-Black",
    color: colors.text,
  },

  h3: {
    fontSize: 20,
    lineHeight: 29,
    fontFamily: "Inter-Black",
    color: colors.text,
  },

  pBold: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Inter-Bold",
    color: colors.text,
  },

  p: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    color: colors.text,
  },
};
