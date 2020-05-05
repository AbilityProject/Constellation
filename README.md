# Constellation
This is a visualization designed for the Multisensory room at the NYU Dentistry Oral Health Center for People with Disabilities.

## [Constellation Data](constellationData.js)
This JS file contains an Object for storing constellation information. 

* Object Key 

  The constellation names are used as the object keys. 

* Information Stored

  For each constellation, the coordinates of the stars, the line coordinates, and the color are stored in a nested Object.
    * Star coordinates
    
      How the star coordinates appear in the file: [[x1, y1], [x2, y2], ...]
     
    * Line coordinates for drawing lines
      
      When drawing lines in p5js, the function call asks for the x and y coordinates of the start and end. 
      
      To reduce the amount of repeated coordinate information, line coordinates are grouped together by path chains
      
      How the coordinates appear: [ [x1, y1, x2, y2, x3, y3, ...] , [x1, y1, x5, y5, ... ] ]
      
      The first element in the list represents the coordinates on one path and the second element represents the coordinates that lie on another path.
    * Color
      
      A list of the rgb values to define the color

## [Constellation Class](constellation.js)
* constructor

  A Constellation is made by initializing the name, list of star coordinates, a list of list of path coordinates, and a color. Before the Star objects for the constellation are created, the coordinates are scaled and translated. 
* display

  The display() method displays the constellation's name, the stars, and the lines connecting the stars. After the stars are displayed, they are updated accordingly to either grow or shrink in size. 

* drawLines

  The drawLines() method draws the lines of the constellation. The color of the lines (stroke) change at the same rate as the stars of the constellation change in size. 

* translate

  The translate() method adjusts the coordinates after scaling them so that the constellation is centered at the screen's center. 

* getCenter

  The getCenter() method finds the center coordinate of the constellation by taking the average of the minimum and maximum X, Y coordinates of stars. 

* scale

  The scale() method scales the coordinates read in from [constellationData.js](constellationData.js) by a scaling factor.

* scaleFactor

  The scaleFactor() method returns a number, used for scaling the coordinates to fit the whole screen. 
