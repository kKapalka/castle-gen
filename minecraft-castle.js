
let defaultMoatWidth=3
let defaultMoatSize=3
let defaultFloorHeight=6
let baseBridgeOffsetSize=2
let windowSpacing=5

let minOffset = pos(3,0, 3)
let standardMoatOffset = pos(defaultMoatWidth+4,0,defaultMoatWidth+4)


player.onChat("generate", function(width, length) {
    let position = player.position()
    clearArea(position,width,length)
    makeMoats(position,width,length)
    makeFoundations(position,width,length)
    makeWall(position,width,length)
    plantWindows(position, width, length)
    plantBridgeAndGate(position, width, length)
})

function clearArea(position: Position,width: number,length: number) {
    let maxOffset = pos(width+((defaultMoatWidth+4)*2) + 3, 2*defaultFloorHeight, (length+(defaultMoatWidth+4)*2+3))
    blocks.fill(AIR, position.add(minOffset), position.add(maxOffset), FillOperation.Replace)
}

function plantWindows(position: Position,width: number,length: number) {
    
    let maxOffset = pos(width + 3,defaultFloorHeight, length+3)
    for(let i=Math.floor(windowSpacing/2); i<width; i+=windowSpacing) {
        blocks.fill(GLASS, 
            position.add(minOffset).add(pos(i,2,0)).add(standardMoatOffset),
             position.add(minOffset).add(pos(i,Math.max(defaultFloorHeight - 2, 3),0)).add(standardMoatOffset), FillOperation.Replace)
        blocks.fill(GLASS, 
            position.add(minOffset).add(pos(i,2,length)).add(standardMoatOffset),
            position.add(minOffset).add(pos(i,Math.max(defaultFloorHeight - 2, 3),length)).add(standardMoatOffset), FillOperation.Replace)
    }
    for(let i=Math.floor(windowSpacing/2); i<length; i+=windowSpacing) {
        blocks.fill(GLASS, 
            position.add(minOffset).add(pos(0,2,i)).add(standardMoatOffset),
             position.add(minOffset).add(pos(0,Math.max(defaultFloorHeight - 2, 3),i)).add(standardMoatOffset), FillOperation.Replace)
        blocks.fill(GLASS, 
            position.add(minOffset).add(pos(width,2,i)).add(standardMoatOffset),
            position.add(minOffset).add(pos(width,Math.max(defaultFloorHeight - 2, 3),i)).add(standardMoatOffset), FillOperation.Replace)
    }
}

function plantBridgeAndGate(position: Position,width: number,length: number) {
    let evenOut = width%2
    let halfWidth = pos(Math.floor(width/2)+defaultMoatWidth+4, 0, 0)
    blocks.fill(DARK_OAK_FENCE,
        position.add(minOffset).add(halfWidth).add(pos(baseBridgeOffsetSize*-1-1, 1, defaultMoatWidth+4)),
        position.add(minOffset).add(halfWidth).add(pos(baseBridgeOffsetSize + evenOut+1, Math.max(defaultFloorHeight - 2, 3), defaultMoatWidth+4)),
        FillOperation.Replace)
    blocks.fill(AIR,
        position.add(minOffset).add(halfWidth).add(pos(baseBridgeOffsetSize*-1, 1, defaultMoatWidth+4)),
        position.add(minOffset).add(halfWidth).add(pos(baseBridgeOffsetSize + evenOut, Math.max(defaultFloorHeight - 2, 3), defaultMoatWidth+4)),
        FillOperation.Replace)
    blocks.fill(OAK_WOOD_SLAB,
        position.add(minOffset).add(halfWidth).add(pos(baseBridgeOffsetSize*-1, 1, defaultMoatWidth-1)),
        position.add(minOffset).add(halfWidth).add(pos(baseBridgeOffsetSize + evenOut, 1, defaultMoatWidth+5)),
        FillOperation.Replace)
}

function makeFoundations(position: Position, width: number, length: number) {
    let maxOffset = pos(width+3, 1,length+3)
    blocks.fill(POLISHED_ANDESITE, 
        position.add(minOffset).add(pos(defaultMoatWidth+4, defaultMoatSize*-1, defaultMoatWidth+4)), 
        position.add(maxOffset).add(standardMoatOffset),
         FillOperation.Replace)
}

function makeMoats(position: Position, width: number, length: number) {
    let maxOffset = pos(width + ((defaultMoatWidth+4)*2) + 3,0, length+((defaultMoatWidth+4)*2)+3)
    blocks.fill(GRANITE, 
        position.add(minOffset).add(pos(0, defaultMoatSize*-1, 0)),
        position.add(maxOffset), FillOperation.Hollow)
    blocks.fill(WATER, 
        position.add(minOffset).add(pos(defaultMoatWidth,defaultMoatSize*-1 + 1,defaultMoatWidth)),
        position.add(maxOffset).add(pos(defaultMoatWidth*-1,0,defaultMoatWidth*-1)), 
        FillOperation.Replace)
}

function makeWall(position: Position, width: number, length: number) {
    let maxOffset = pos(width + 3,defaultFloorHeight, length+3)
    blocks.fill(ANDESITE, 
        position.add(minOffset).add(standardMoatOffset).add(pos(0,1,0)),
         position.add(maxOffset).add(standardMoatOffset), FillOperation.Replace)
    blocks.fill(COBBLESTONE_WALL, 
        position.add(minOffset).add(pos(0, defaultFloorHeight,0)).add(standardMoatOffset).add(pos(0,1,0)),
         position.add(maxOffset).add(standardMoatOffset).add(pos(0,1,0)), FillOperation.Replace)
    blocks.fill(AIR, 
        position.add(minOffset).add(standardMoatOffset).add(pos(1,1,1)),
         position.add(maxOffset).add(standardMoatOffset).add(pos(-1,2,-1)),
         FillOperation.Replace)
}