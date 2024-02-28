export default interface PrimaryButtonProps {
  content: string;
  type: "functional" | "link";
  linkDest?: string;
  backgroundColor: string;
  height: number;
  fontFamily: "Cabin" | "EB Garamond";
}
