#!/bin/sh

cd ../
WORKING_DIR=`pwd`
INSTALL_DIR=`echo "$TMPDIR"sketchbook`
TEST_SCRIPT=`echo "$WORKING_DIR"/scripts/require-test.js`

if [ -d "$INSTALL_DIR" ]; then
  rm -rf $INSTALL_DIR
fi

mkdir $INSTALL_DIR
cd $WORKING_DIR
npm pack
mv sketchbook.js-*.tgz $INSTALL_DIR
cd $INSTALL_DIR
tar -tf sketchbook.js-*.tgz
npm install sketchbook.js-*.tgz
node -p "require('sketchbook.js');"

if [ -d "$INSTALL_DIR" ]; then
  rm -rf $INSTALL_DIR
fi
