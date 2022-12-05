import "./styles.css"; // keep this here!

// naimportujte vše co je potřeba z BabylonJS
import {
  Engine,
  Scene,
  UniversalCamera,
  MeshBuilder,
  Path3D,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Axis,
  Space,
  Color3,
  SceneLoader,
  DeviceOrientationCamera,
  Mesh,
  Animation
} from "@babylonjs/core";
import "@babylonjs/inspector";

//canvas je grafické okno, to rozáhneme přes obrazovku
const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, true);

//scéna neměnit
const scene = new Scene(engine);
// Default Environment

//vytoření kamery v pozici -5 (dozadu)
const camera = new DeviceOrientationCamera(
  "kamera",
  new Vector3(1, 1, 10),
  scene
);

//zaměřit kameru do středu
camera.setTarget(new Vector3(0, 1, 0));

//spojení kamery a grafikcého okna
camera.attachControl(canvas, true);

//zde přídáme cyklus for

//světlo
const light1 = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

var vreteno;
var zasobnik = [];

SceneLoader.ImportMesh("", "public/", "vreteno_nr11.obj", scene, function (
  newMeshes
) {
  // Pozice, měřítko a rotace
  newMeshes[0].scaling = new Vector3(0.015, 0.015, 0.0175);
  newMeshes[0].rotate(new Vector3(-1, 0, 0), Math.PI / 2);
  newMeshes[0].position.z = -2;
  newMeshes[0].position.x = 1;
  vreteno = newMeshes[0];

  //var i = 0;
  //for (i = 0; i < 1; i++) {
  //vreteno = newMeshes[0].clone("vreteno" + i, newMeshes[0].parent, false);
  //vreteno.position.x = i - 10;
  //zasobnik[i] = vreteno;
  //}
});

scene.registerBeforeRender(function () {});
//zde uděláme animaci

// povinné vykreslování
engine.runRenderLoop(function () {
  scene.render();
});
const environment1 = scene.createDefaultEnvironment({
  enableGroundShadow: true
});
// zde uděláme VR prostředí
const xrHelper = scene.createDefaultXRExperienceAsync({
  floorMeshes: environment1.ground
});
environment1.setMainColor(Color3.FromHexString("#74b9ff"));

//scene.debugLayer.show();
