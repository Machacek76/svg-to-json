# svg-to-json
This is a simple converter for SVG icons to JSON, TS, or JS files. Currently, it only converts paths from SVG. In future versions, support for the SVG element will be added. As such, it is currently only suitable for simple icons.

### install
```npm install --save-dev svg-to-json```

### setting required

In the root folder of your project

`.svg-to-json.json`
```
{
    "props": {
        "inputDir": "icons",
        "outputDir": "output-dir",
        "fileName": "iconsPath",
        "outputType": [
            "json",
            "ts",
            "js"
        ]
    }
}
```

### example use in React

```
import { useState, useEffect } from 'react';
import { iconsPaths } from './iconsPaths';
import styles from './svg.module.css';

export type IconNameType = keyof typeof iconsPaths;

interface Props {
  color?: string;
  name: IconNameType;
  size?: number | string;
  className?: string;
  type: string;
}

interface IcontProps {
  viewBox: string;
  fill: string;
  paths: IconPath[];
}

interface IconPath {
  d: string;
  fillRule: string;
  clipRule?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: string;
  strokeLinejoin?: string;
}

const getIconPath = (iconName: IconNameType): IcontProps => {
  if (!iconsPaths[iconName]) throw Error(`Icon ${iconName} does not exist.`);

  return iconsPaths[iconName];
};

const Icon = ({ color = '', name, size = '1em', className = '' }: Props) => {
  const [icon, setIcon] = useState<IcontProps>(getIconPath(name));
  const [fill, setFill] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIcon(getIconPath(name));

    if (color && icon.fill !== undefined && icon.fill !== 'none') {
      setFill(color);
    } else if (icon.fill !== undefined) {
      setFill(icon.fill.toString());
    }
  }, [name]);

  return (
    <svg
      fill={fill}
      role="img"
      viewBox={icon.viewBox}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.fill} ${className}`}
      color={color}
    >
      {icon.paths.length > 0 &&
        icon.paths.map((path: {}, index) => <path key={index} {...path} />)}
    </svg>
  );
};

export default Icon;
```