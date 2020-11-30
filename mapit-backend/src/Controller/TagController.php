<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\TagSerializer;
use App\Repository\TagRepository;
use App\Repository\PlaceRepository;

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
        $tag = $tagSerializer->deserialize($request->getContent());
        var_dump($tag); 
        var_dump($tag->getPlaces());die;

        $placeName = $tag->getPlaces()[0]->getName();
        // Other way, same result
        $postData = \json_decode($request->getContent());
        $placeLatitude = $postData->taggedPlace->latitude;

        $placeExists = $placeRepository->findOneBy([
            'name' => $placeName,
            'latitude' => $placeLatitude,
            ]
        );
        /* $tag->getPlaces()->persist --- save() aus PlaceRepo */
        var_dump($placeExists);die;
        
    }
}
