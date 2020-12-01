<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\TagSerializer;
use App\Repository\TagRepository;
use App\Repository\PlaceRepository;
use App\Entity\Tag;
use App\Entity\Place;

class TagController extends AbstractController
{
    /**
     * @Route("/tag", methods={"GET"})
     */
    public function index(TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse
    {
        $tags = $tagRepository->findAll();

        return new JsonResponse(
            $tagSerializer->serialize($tags),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag"), methods={"POST"}
     */
    public function create(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse {
        $tag = $tagSerializer->deserialize($request->getContent());
        $tagRepository->save($tag); 

        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag/add"), methods={"POST"}
     */
    public function add(Request $request, TagRepository $tagRepository, PlaceRepository $placeRepository, TagSerializer $tagSerializer): JsonResponse {
        // Take the request, make a Tag and a Place class object out of it
        $tag = $tagSerializer->deserialize($request->getContent());
        var_dump($tag); 
        $newTag = new Tag();
        $newTag->setName($tag->getName());
        var_dump($newTag);  
        // Show the whole Array collection of the Place class object 
        var_dump($tag->getPlaces());

        // Use Place class native method getName() to save the name of this Place object in a variable
        $placeName = $tag->getPlaces()[0]->getName();
        var_dump(($placeName)); 
        $placeStreet = $tag->getPlaces()[0]->getStreet();
        var_dump($placeStreet); 
        $placeZipcode = $tag->getPlaces()[0]->getZipcode();
        var_dump($placeZipcode); 
        // Other way, same result – but not clean object oriented
        // $postData = \json_decode($request->getContent());
        // $placeLatitude = $postData->taggedPlace->latitude;

        // Use findOneBy() from the PlaceRepo to look there for a place of the same name, street, zipcode 
        $placeExists = $placeRepository->findOneBy([
            'name' => $placeName,
            'street' => $placeStreet,
            'zipcode' => $placeZipcode
            ]
        );

        $place = $tag->getPlaces();
            var_dump($place);
            $place = new Place();
            $place->setName($tag->getPlaces()[0]->getName());
            $place->setStreet($tag->getPlaces()[0]->getStreet());
            $place->setZipcode($tag->getPlaces()[0]->getZipcode());
            $place->setLatitude($tag->getPlaces()[0]->getLatitude());
            $place->setLongitude($tag->getPlaces()[0]->getLongitude());

        // if Statement does not work
        if(!($placeExists)) {
            $placeRepository->save($place);
        }
        $placeRepository->save($place);

        var_dump($place);
        $newTag->addPlace($place);
        $tagRepository->save($newTag);

        var_dump($newTag->getId());
        var_dump($place->getId()); 

        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
        
    }
}
