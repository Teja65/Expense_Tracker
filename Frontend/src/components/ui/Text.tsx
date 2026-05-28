import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function Text<T extends ElementType = 'p'>({
  as,
  children,
  className = '',
  ...props
}: TextProps<T>) {
  const Component = as || 'p';

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

export function Heading1(props: Omit<TextProps<'h1'>, 'as'>) {
  return <Text as='h1' {...props} />;
}

export function Heading2(props: Omit<TextProps<'h2'>, 'as'>) {
  return <Text as='h2' {...props} />;
}

export function Paragraph(props: Omit<TextProps<'p'>, 'as'>) {
  return <Text as='p' {...props} />;
}

export function LabelText(props: Omit<TextProps<'div'>, 'as'>) {
  return <Text as='div' {...props} />;
}
