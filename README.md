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

  A Constellation is created by initializing the name, list of star coordinates, a list of list of path coordinates, and a color. Before the Star objects for the constellation are created, the coordinates are scaled and translated. 

* display

  The `display()` method displays the constellation's name, the stars, and the lines connecting the stars. After the stars are displayed, they are updated accordingly to either grow or shrink in size. 

* drawLines

  The `drawLines()` method draws the lines of the constellation. The color of the lines (stroke) change at the same rate as the stars of the constellation change in size. 

* translate

  The `translate()` method adjusts the coordinates after scaling them so that the constellation is centered at the screen's center. 

* getCenter

  The `getCenter()` method finds the center coordinate of the constellation by taking the average of the minimum and maximum X, Y coordinates of stars. 

* scale

  The `scale()` method scales the coordinates read in from [constellationData.js](constellationData.js) by a scaling factor.

* scaleFactor

  The `scaleFactor()` method returns a number, used for scaling the coordinates to fit the whole screen. 

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

## [Star Class](star.js)
* constructor

  A Star is created by initializing the center coordinates, number of vertices, a start size, an end size, and color in RGB. The start and end sizes are used for determining the inital size when the star is created and the maximum size (for the constellation stars) when they grow and shrink. 

* drawVertices

  The `drawVertices()` method draws the points of the star. Because the first vertex is drawn directly above the center of the star, the angles used to draw the vertices are shifted by 90 degrees. Note that there is no function call to draw the lines of the star. When `drawVertices()` is called in the `display()` method, `beginShape()` and `endShape(CLOSED)` are used to indicate that the vertices create a closed shape (in this case, a star).

* display

  The `display()` method draws the star with its defined color. A transparent circle is also drawn behind the star.

* update

  The `update()` method adjusts the properties used for growing and shrinking the star, such as increasing/decreasing the star size by the offset. The timer for the star starts when the star pulses. After the timer hits the max time set, the star begins to shrink. 

* checkEdge

  The `checkEdge()` method checks whether the offset used for star pulsing is out of bounds. If so, the offset's direction is reversed to allow the star to shrink and grow.  

* isDone

  The `isDone()` checks whether the star is done displaying. 

* reset

  The `reset()` method resets the properties used for growing and shrinking the star size. Constellation stars call this method when the constellation is done displaying in preparation for the next time it is displayed. 