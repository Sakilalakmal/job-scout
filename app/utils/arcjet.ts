import arcjet, {
  fixedWindow,
  detectBot,
  shield,
  tokenBucket,
} from "@arcjet/next";

export { fixedWindow, detectBot, shield, tokenBucket };

export default arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    
  ],
});
