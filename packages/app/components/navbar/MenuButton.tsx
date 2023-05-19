import { Button } from "@/ui";

interface MenuButtonProps {
  open: boolean;
  toggle: () => void;
}

export default function MenuButton({ open, toggle }: MenuButtonProps) {
  return open ? (
    <Button
      action="secondary"
      iconLeft="close"
      size="icon"
      className="md:invisible"
      onClick={toggle}
    />
  ) : (
    <Button
      action="secondary"
      iconLeft="menu"
      size="icon"
      className="md:invisible"
      onClick={toggle}
    />
  );
}
