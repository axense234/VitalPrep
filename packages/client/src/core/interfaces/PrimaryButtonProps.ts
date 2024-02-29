export default interface PrimaryButtonProps {
  content: string;
  type: "functional" | "link";
  linkDest?: string;
  fontFamily: "Cabin" | "EB Garamond";
  fontSize: number;
  backgroundColor: string;
  height: number;
  width: number;
}
