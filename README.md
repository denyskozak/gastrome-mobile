##Troubleshooting

1. WARNING: CocoaPods requires your terminal to be using UTF-8 encoding.

export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

2. ^ use of bitwise '|' with boolean operands 

Add '||' instead '|'

3. Code rules:
- objects always immutable, for change - create new object like { ...object }

4. Components:
- Atomic - components can't be split
- Molecular - components can be split on Atomic
- Organismic - components can be split on Molecular
- Templates - bind to project (like translation)# gastrome-mobile

5. replace
   In node_modules/react-native/third-party-podspecs/boost.podspec replace:

'https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2'
By:

'https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2'