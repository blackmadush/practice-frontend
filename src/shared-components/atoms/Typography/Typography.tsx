import React from 'react';

interface TypographyProps {
  tag?: keyof JSX.IntrinsicElements; 
  component?: React.ElementType; 
  className?: string;                
  color?: string;                    
  size?: string;                     
  weight?: string;                  
  children: React.ReactNode;        
  style?: React.CSSProperties;       
}


const Typography: React.FC<TypographyProps> = ({
  tag: Tag = 'p',
  component: Component,
  className = '',
  color,
  size,
  weight,
  children,
  style,
}) => {
  
  const styles: React.CSSProperties = {
    color,
    fontSize: size,
    fontWeight: weight,
    ...style,
  };

  const ComponentOrTag = Component || Tag;

  return (
    <ComponentOrTag className={className} style={styles}>
      {children}
    </ComponentOrTag>
  );
};

export default Typography;
