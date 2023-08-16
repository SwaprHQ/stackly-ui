import { Button } from "@/ui";

interface MenuButtonProps {
  open: boolean;
  toggle: () => void;
}

export default function MenuButton({ open, toggle }: MenuButtonProps) {
  return open ? (
    <Button
      variant="secondary"
      iconLeft="close"
      size="icon"
      className="md:invisible"
      onClick={toggle}
    />
  ) : (
    <Button
      variant="secondary"
      iconLeft="menu"
      size="icon"
      className="md:invisible"
      onClick={toggle}
    />
  );
}
