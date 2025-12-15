## Troubleshooting

1. WARNING: CocoaPods requires your terminal to be using UTF-8 encoding.

export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

2. ^ use of bitwise '|' with boolean operands 

solution: Add '||' instead of '|'

3. Code rules:
- objects always immutable, for change - create new object like { ...object }

4. Components:
- Atomic - components can't be split
- Molecular - components can be split on Atomic
- Organismic - components can be split on Molecular
- Templates - bind to project (like translation)# gastrome-mobile
