<?php

namespace App\Controller;

use App\Repository\PlaceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\PlaceSerializer;
use App\Services\FindPlace;
use App\Services\AuthenticationService;

class PlaceController extends AbstractController
{
    /**
     * @Route("/place", methods={"GET"})
     */
    public function findAllPlaces(PlaceRepository $placeRepository, PlaceSerializer $placeSerializer): JsonResponse {
        $places = $placeRepository->findAll();

        return new JsonResponse(
            $placeSerializer->serialize($places),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/place", methods={"POST"})
     */
    public function find(Request $request, PlaceSerializer $placeSerializer, FindPlace $findPlace, AuthenticationService $authentication ): JsonResponse {
        $postData = $placeSerializer->deserialize($request->getContent());

        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $places = $user->getPlaces();

        foreach($places as $place) {
            var_dump($place);
            if ($place->getName() === $postData->getName() && 
            $place->getStreet() === $postData->getStreet() && 
            $place->getZipcode() === $postData->getZipcode()) {
                return $place;
            } else {
                return $place = null;
            }
        }
        
        /* $place = $findPlace->findRequestedPlace($postData); */

        if(is_null($place)) {
            return new JsonResponse(
                $placeSerializer->serialize($postData),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }

        return new JsonResponse(
            $placeSerializer->serialize($place),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
